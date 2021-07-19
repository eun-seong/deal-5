const url = 'http://localhost:81';

export const getItemList = ({ location, uid, limit }: { location: string; uid: number; limit: number }) => {
  return fetch(url + '/api/main/action-get-item-list', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      location,
      uid,
      limit,
    }),
  }).then(response => response.json());
};

export const changeBookmark = ({ uid, bookmarked, item_id }: { uid: number; bookmarked: boolean; item_id: number }) => {
  console.log(uid, bookmarked, item_id);
  return fetch(url + '/api/main/action-bookmark', {
    method: 'post',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      uid,
      bookmarked,
      item_id,
    }),
  }).then(response => response.json());
};
