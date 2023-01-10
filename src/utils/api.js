const BASE_URL = 'https://forum-api.dicoding.dev/v1';

const getAccessToken = () => localStorage.getItem('accessToken') || null;

const putAccessToken = (token) => {
  localStorage.setItem('accessToken', token);
};

const deleteAccessToken = () => {
  localStorage.removeItem('accessToken');
};

const fetchWithAuth = (url, options) => fetch(url, {
  ...options,
  headers: {
    ...options.headers,
    Authorization: `Bearer ${getAccessToken()}`,
  },
});

const login = async ({ email, password }) => {
  const response = await fetch(`${BASE_URL}/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email, password,
    }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data.token;
};

const getThreads = async () => {
  const response = await fetch(`${BASE_URL}/threads`, {
    method: 'GET',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(response.message);
  }

  return responseJson.data.threads;
};

const getUsers = async () => {
  const response = await fetch(`${BASE_URL}/users`, {
    method: 'GET',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(response.message);
  }

  return responseJson.data.users;
};

const getLeaderboards = async () => {
  const response = await fetch(`${BASE_URL}/leaderboards`, {
    method: 'GET',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(response.message);
  }

  return responseJson.data.leaderboards;
};

const getOwnProfile = async () => {
  const response = await fetchWithAuth(`${BASE_URL}/users/me`, {
    method: 'GET',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data.user;
};

const addThread = async ({ title, body, category }) => {
  const response = await fetchWithAuth(`${BASE_URL}/threads`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title, body, category,
    }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data.thread;
};

const upVote = async ({ threadId }) => {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/up-vote`, {
    method: 'POST',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data.vote;
};

const downVote = async ({ threadId }) => {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/down-vote`, {
    method: 'POST',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data.vote;
};

const netralVote = async ({ threadId }) => {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/neutral-vote`, {
    method: 'POST',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data.vote;
};

const detailThread = async ({ threadId }) => {
  const response = await fetch(`${BASE_URL}/threads/${threadId}`);
  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data.detailThread;
};

const addComment = async ({ threadId, content }) => {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      content,
    }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data.comment;
};

const upVoteComment = async ({ threadId, commentId }) => {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/up-vote`, {
    method: 'POST',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data.vote;
};

const downVoteComment = async ({ threadId, commentId }) => {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/down-vote`, {
    method: 'POST',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data.vote;
};

const netralVoteComment = async ({ threadId, commentId }) => {
  const response = await fetchWithAuth(`${BASE_URL}/threads/${threadId}/comments/${commentId}/neutral-vote`, {
    method: 'POST',
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data.vote;
};

const register = async ({ name, email, password }) => {
  const response = await fetch(`${BASE_URL}/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name, email, password,
    }),
  });

  const responseJson = await response.json();

  if (responseJson.status !== 'success') {
    throw new Error(responseJson.message);
  }

  return responseJson.data.user;
};

export const api = {
  getAccessToken,
  putAccessToken,
  login,
  getThreads,
  getUsers,
  getLeaderboards,
  getOwnProfile,
  addThread,
  deleteAccessToken,
  upVote,
  netralVote,
  downVote,
  detailThread,
  addComment,
  upVoteComment,
  netralVoteComment,
  downVoteComment,
  register,
};

export {
  getAccessToken,
  putAccessToken,
  login,
  getThreads,
  getUsers,
  getLeaderboards,
  getOwnProfile,
  addThread,
  deleteAccessToken,
  upVote,
  netralVote,
  downVote,
  detailThread,
  addComment,
  upVoteComment,
  netralVoteComment,
  downVoteComment,
  register,
};
