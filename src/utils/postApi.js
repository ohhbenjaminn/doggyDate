import tokenService from './tokenService';

const BASE_URL = '/api/posts';

export function create(post) {
    return fetch(BASE_URL, {
      method: 'POST',
      body: post,
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    
    }).then(res => {
      if(res.ok) return res.json();
      throw new Error('Bad Credentials! CHECK THE SERVER TERMINAL!')
    })
  }

  export function getAll() {
    return fetch(BASE_URL, {
      headers: {
        'Authorization': 'Bearer ' + tokenService.getToken()
      }
    })
    .then(res => {
      console.log(res)
      if(res.ok) return res.json();
      throw new Error('Bad Credentials! CHECK THE SERVER TERMINAL!')
    })
  }

  export async function grabEvent(_id) {
    try {
        const request = await fetch(`/api/posts/event/${_id}`, {
             method: 'POST',
             headers: {
               'Authorization': 'Bearer ' + tokenService.getToken()
             },
             body: { _id }
         });
         const response = await request.json();
        if(response) {
          return response;
        }

    } catch (error) {
        console.log('error getting event', error)
    }
}