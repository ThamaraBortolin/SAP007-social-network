import {
  auth,
} from '../../firebase/auth-firebase.js';

import {
  likes,
  deslike,
  deletePost,
  editPosts,
} from '../../firebase/firestore.js';

export function getAllPosts(post) {
  const container = document.createElement('li');
  container.classList.add('containerPosts');
  const userPost = post.user === auth.currentUser.displayName;

  const templateAllPosts = `    
            <img class="imgUser" src="images/img/add.png">    
            <p class="userName">${post.user}</p>
            <p class="postDate">${post.data}</p>
            <div class="break"> <p class="postTheme">${post.theme}</p></div>
            <p class="postMessage">${post.message}</p>
            <p class="postLikes" >${post.likes.length}</p>
            <button class="btnPopLike">
            <img class="popLike" src="images/img/popTimeLogo.png">
            </button>
            ${userPost ? `
            <div class="postUser">
            <button class="btnEdit"><img class="imgEdit" src="images/img/edit.png"></button>
            <button class="btnDelet"><img class="imgDelet" src="images/img/delet.png"></button>
            </div>
            ` : ''}
            <div class = "modalEditBack">
            <div class = "modalEdit">
            <span class= "close" >&times</span>
            <P>Edite sua postagem aqui</p>
            <textarea class="editTextarea">${post.message}</textarea>
            <button class="btnEditConfirm">Confirmar</button>
            <button class="btnEditCancel">Cancelar</button>
            </div>
            </div>
            
            <div class="modalDeletBack">
            <div class="modalDelet">
            <p>Deseja realmente apagar sua postagem?</p>
            <button class="btnDeletConfirm">Confirmar</button>
            <button class="btnDeletCancel">Cancelar</button>
            </div>
            </div>
            `;

  container.innerHTML = templateAllPosts;

  const btnPopLike = container.querySelector('.btnPopLike');
  const contLikes = container.querySelector('.postLikes');
  
  const textArea = container.querySelector('.editTextarea');
  const modal = container.querySelector('.modalEditBack');
  const close = container.querySelector('.close');
  const btnEdit = container.querySelector('.btnEdit');
  const btnEditConfirm = container.querySelector('.btnEditConfirm');
  const btnEditCancel = container.querySelector('.btnEditCancel');

  const deletModal = container.querySelector('.modalDeletBack');
  const btnDeletCancel = container.querySelector('.btnDeletCancel');
  const btnDeletConfirm = container.querySelector('.btnDeletConfirm');

  btnPopLike.addEventListener('click', (e) => {
    e.preventDefault();
    const userLikes = post.likes;
    const postId = post.id;

    if (!userLikes.includes(auth.currentUser.uid)) {
      likes(postId, auth.currentUser.uid)
        .then(() => {
          userLikes.push((auth.currentUser.uid));
          const addLikeNum = Number(contLikes.innerHTML) + 1;
          contLikes.innerHTML = addLikeNum;
        });
    } else {
      deslike(postId, auth.currentUser.uid)
        .then(() => {
          userLikes.splice(auth.currentUser.uid);
          const addLikeNum = Number(contLikes.innerHTML) - 1;
          contLikes.innerHTML = addLikeNum;
        });
    }
  });

  if (userPost) {
    const btnDelet = container.querySelector('.btnDelet');
    btnDelet.addEventListener('click', (e) => {
      e.preventDefault();
      deletModal.style.display = 'block';
    });
    btnDeletCancel.addEventListener('click', (e) => {
      e.preventDefault();
      deletModal.style.display = 'none';
    });
    btnDeletConfirm.addEventListener('click', () => {
      deletePost(post.id)
        .then(() => {
          deletModal.style.display = 'none';
        });
    });
  }

  if (userPost) {
    btnEdit.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'block';
    });
    close.addEventListener('click', () => {
      modal.style.display = 'none';
    });
    btnEditCancel.addEventListener('click', (e) => {
      e.preventDefault();
      modal.style.display = 'none';
    });
    btnEditConfirm.addEventListener('click', async() => {
      const message = textArea.value;
      await editPosts(post.id, message)
        .then(() => {
          modal.style.display = 'none';
        });
    });
  }

  return container;
}
