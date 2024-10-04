const BASE_URL = 'http://localhost:8080';

export const GetAllEmployees = async (search = '', page = 1, limit = 5) => {
    const url = `${BASE_URL}/api/employees?search=${search}&page=${page}&limit=${limit}`;
    try {
        const options = {
            method: 'GET',
            'Content-Type': 'application/json'
        }
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch(err) {
        return err;
    }
}

export const CreateEmployees = async (empObj) => {
    const url = `${BASE_URL}/api/employees`;
    try {
        const formData = new FormData();

        for(const key in empObj) {
            formData.append(key, empObj[key]);
        }

        const options = {
            method: 'POST',
            'Content-Type': 'application/json',
            body: formData
        }
        const result = await fetch(url, options);
        const data = await result.json();
        return data;
    } catch(err) {
        return err;
    }
}
