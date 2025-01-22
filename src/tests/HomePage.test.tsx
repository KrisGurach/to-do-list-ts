import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Home from '@/pages';
import '@testing-library/jest-dom/extend-expect';

const mockStore = configureStore();
const store = mockStore({
  tasks: {
    tasks: [{ id: 1, title: 'Test Task' }],
  },
});

test("renders HomePage", () => {
  const { getByText } = render(
    <Provider store={store}>
      <Home />
    </Provider>
  );

  expect(getByText("Список задач")).toBeInTheDocument(); // Ожидание наличия заголовка
  expect(getByText('Test Task')).toBeInTheDocument(); // Проверка наличия задачи
});
