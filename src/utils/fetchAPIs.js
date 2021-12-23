import axios from "axios";

//auth user API loginng in
import {PAT , UserName , BASE_URL } from '../constants/Constants'

export const loginAuthUser = async (UserName) => {
  const authUserRecord = await axios
    .get(`${BASE_URL}/users/${UserName}`)
    .then((resp) => resp?.data);
  return authUserRecord;
};

export const publicGistsRecord = async () => {
  const publicGistsRecords = await axios
    .get(`${BASE_URL}/gists`)
    .then((resp) => resp?.data);
  return publicGistsRecords;
};

export const getPublicGist = async (id) => {
  const getPublicGistObj = await axios
    .get(`${BASE_URL}/gists/${id}`, {
      id: id,
    })
    .then((resp) => resp.data);
  return getPublicGistObj;
};

export const privateGistsRecord = async () => {
  const privateGistsRecord = await axios
    .get(`${BASE_URL}/gists?per_page=10`, {
      headers: {
        Authorization: `Basic ${btoa(`${UserName}:${PAT}`)}`,
      },
    })
    .then((resp) => resp.data);
  return privateGistsRecord;
};

export const searchRecords = async (UserName) => {
  const searchedUserRecords = await axios
    .get(`${BASE_URL}/users/${UserName}/gists`, {
      UserName: UserName,
    })
    .then((resp) => resp.data);
  return searchedUserRecords;
};

export const createAGist = async (data) => {
  const json = JSON.stringify(data);
  const createGist = axios
    .post(`${BASE_URL}/gists`, json, {
      headers: {
        Authorization: `Basic ${btoa(`${UserName}:${PAT}`)}`,
      },
    })
    .then((resp) => resp.data);
  return createGist;
};

export const delAGist = async (id) => {
  const delAGist = axios
    .delete(`${BASE_URL}/gists/${id}`, {
      headers: {
        Authorization: `Basic ${btoa(`${UserName}:${PAT}`)}`,
      },
    })
    .then((resp) => resp.data);
  return delAGist;
};

export const updateAGist = async (id, disp) => {
  const updateGists = await axios.patch(
    `${BASE_URL}/gists/${id}`,
    {
      id: id,
      description: disp,
    },
    {
      headers: {
        Authorization: `Basic ${btoa(`${UserName}:${PAT}`)}`,
      },
    }
  );
  return updateGists;
};
export const getGistObj = async (id) => {
  const getGists = await axios
    .get(`${BASE_URL}/gists/${id} `, {
      headers: {
        Authorization: `Basic ${btoa(`${UserName}:${PAT}`)}`,
      },
    })
    .then((resp) => resp.data);
  return getGists;
};

export const getStaredGists = async () => {
  const getStaredGists = await axios
    .get(`https://api.github.com/gists/starred`, {
      headers: {
        Authorization: `Basic ${btoa(`${UserName}:${PAT}`)}`,
      },
    })
    .then((resp) => resp.data);
  return getStaredGists;
};

export const checkGistStared = async (uniqueId) => {
  const checkStar = await axios.get(`${BASE_URL}/gists/${uniqueId}/star`, {
    headers: {
      Authorization: `Basic ${btoa(`${UserName}:${PAT}`)}`,
    },
  });
  return checkStar;
};

export const staredAGist = async (gist_id) => {
  const starAGist = await axios.put(
    `${BASE_URL}/gists/${gist_id}/star`,
    {
      gist_id: gist_id,
    },
    {
      headers: {
        Authorization: `Basic ${btoa(`${UserName}:${PAT}`)}`,
      },
    }
  );
  return starAGist;
};

export const unStaredAGist = async (gist_id) => {
  const unStarAGist = await axios.delete(`${BASE_URL}/gists/${gist_id}/star`, {
    headers: {
      Authorization: `Basic ${btoa(`${UserName}:${PAT}`)}`,
    },
  });
  return unStarAGist;
};

export const forkedGist = async (gist_id) => {
  const forkAGist = await axios
    .post(
      `${BASE_URL}/gists/${gist_id}/forks`,
      {
        gist_id: gist_id,
      },
      {
        headers: {
          Authorization: `Basic ${btoa(`${UserName}:${PAT}`)}`,
        },
      }
    )
    .then((resp) => resp?.status)
    .catch((err) => console.log(err));
  return forkAGist;
};
