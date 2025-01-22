// Home.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import * as api from '../utils/api'; // Импортируем ваш модуль API, если нужно
import Home from '../pages/index';
import { RootState } from '../interfaces/Task';
import { addTask } from '../store/tasksSlice';

const mockStore = configureStore<RootState>([]);

describe('Home Component', () => {
  let store: MockStoreEnhanced<RootState>;

  beforeEach(() => {
    store = mockStore({
      tasks: [], // Начальное состояние задач
    });
    jest.clearAllMocks();
  });

  test('renders Home component', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(screen.getByText(/Список задач/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Введите задачу/i)).toBeInTheDocument();
  });

  test('adds a new task', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const input = screen.getByPlaceholderText(/Введите задачу/i);
    const button = screen.getByRole('button', { name: /Добавить задачу/i });

    fireEvent.change(input, { target: { value: 'Новая задача' } });
    fireEvent.click(button);

    const actions = store.getActions();
    expect(actions).toContainEqual(addTask(expect.objectContaining({ title: 'Новая задача' })));
  });

  test('does not add an empty task', () => {
    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    const button = screen.getByRole('button', { name: /Добавить задачу/i });
    fireEvent.click(button);

    const actions = store.getActions();
    expect(actions).toHaveLength(0);
  });

  test('fetches tasks on mount', async () => {
    // Mock the fetchTasks API call
    jest.spyOn(api, 'fetchTasks').mockResolvedValueOnce([
      { id: 1, title: 'Задача 1', completed: false },
    ]);

    render(
      <Provider store={store}>
        <Home />
      </Provider>
    );

    expect(await screen.findByText(/Задача 1/i)).toBeInTheDocument(); // Предполагаем, что задача отобразится в TaskList
  });
});
