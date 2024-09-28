import { realtimeDb } from './firebaseConfig';
import { get, onValue, ref, set } from 'firebase/database';

async function writeUserData(userId: string, name: string, email: string, role: 'admin' | 'uset') {
    console.log('start run func');


    try {
        await set(ref(realtimeDb, 'users/' + userId), {
            uid: userId,
            displayName: name,
            email: email,
            role: role,
        });
        console.log('Данные успешно записаны в Realtime Database.');
    } catch (error) {
        console.error('Ошибка при записи данных: ', error);
    }
}

async function readAllUsers() {
    try {
        const usersRef = ref(realtimeDb, 'users');
        const snapshot = await get(usersRef);

        console.log('snapshot: ', snapshot);

        if (!snapshot.exists()) {
            console.log("Пользователи не найдены.");
            return;
        }

        const allUsers = snapshot.val();
        console.log("Все пользователи: ", allUsers);
    } catch (error) {
        console.error("Ошибка чтения данных: ", error);
    }
}

async function subscribeOnUserUpdate(setFunc: Function) {
    const usersRef = ref(realtimeDb, 'users');

    const unsubscribe = onValue(usersRef, (snapshot) => {
        if (!snapshot.exists()) {
            console.log("Нет данных о пользователях");
            setFunc({});
        } else {
            setFunc(snapshot.val());
        }
    });

    return unsubscribe;
}

readAllUsers();

export {
    writeUserData,
    readAllUsers,
    subscribeOnUserUpdate,
}