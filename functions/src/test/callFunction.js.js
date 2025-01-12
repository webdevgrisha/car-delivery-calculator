import {initializeApp} from "firebase-admin";
import firebaseFunctionsTest from "firebase-functions-test";

// Настройка конфигурации Firebase
const firebaseConfig = {
  // Вставьте здесь ваш конфигурационный объект Firebase
};

// Инициализация Firebase Admin
initializeApp(firebaseConfig);

// Инициализация firebase-functions-test
const test = firebaseFunctionsTest();

// Импортируйте вашу функцию
import {calculateRowsData} from "../index";

// Создаем данные запроса
const data = {
  variables: {
    "auction": "IAAI",
    "carPrice": "1000",
    "engineSize": "More 2L",
    "location": "ACE - Perris 92571",
    "customsCosts": "10000",
    "repairCosts": "5000",
    "carSize": "Sedan",
  },
};

// Вызов функции
(async () => {
  try {
    const result = await test.wrap(calculateRowsData)(data);
    console.log("Результат функции:", result);
  } catch (error) {
    console.error("Ошибка вызова функции:", error);
  } finally {
    test.cleanup();
  }
})();
