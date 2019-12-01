const headers = { 'Content-type': 'application/json; charset=UTF-8' };

export const apiUrl = "https://jsonplaceholder.typicode.com";
export const usersUrl = `${apiUrl}/users`;

export function userUrl({ id }) {
  return `${usersUrl}/${id}`;
}

export function validate(status = 200) {
  return response => {
    if (!response.ok || response.status !== status) {
      throw response;
    }

    return response;
  };
}

export async function makeRequest(url, params, status = 200) {
  return fetch(url, params)
    .then(validate(status));
}

export async function getData(url, params, status = 200) {
  return makeRequest(url, params, status)
    .then(response => response.json());
}

export async function fetchUsers() {
  return getData(usersUrl);
}

export async function fetchUser(id) {
  return getData(userUrl({ id }));
}

export async function addUser(user) {
  return getData(usersUrl, {
    method: 'POST',
    body: JSON.stringify(user),
    headers
  }, 201);
}

export async function editUser(user) {
  return getData(userUrl(user), {
    method: 'PUT',
    body: JSON.stringify(user),
    headers
  });
}

export async function deleteUser(user) {
  return makeRequest(userUrl(user), { method: 'DELETE' });
}