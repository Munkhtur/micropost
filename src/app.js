import { http } from './http';
import { ui } from './ui';

//get posts on dom load

document.addEventListener('DOMContentLoaded', getPosts);
document.querySelector('.post-submit').addEventListener('click', submitPost);
document.querySelector('.posts').addEventListener('click', deletePost);
document.querySelector('.posts').addEventListener('click', enableEdit);
document.querySelector('.card-form').addEventListener('click', cancelEdit);

function getPosts() {
  http
    .get('/api/posts')
    .then((data) => {
      ui.showPosts(data);
    })
    .catch((err) => {
      console.log(err);
    });
}

function submitPost(e) {
  const name = document.querySelector('#title').value;
  const body = document.querySelector('#body').value;
  const id = document.querySelector('#id').value;

  const data = {
    name,
    body,
  };

  if (title === '' || body === '') {
    ui.showAlert('Please fill in form', 'alert alert-danger');
  } else {
    if (id === '') {
      http
        .post('/api/posts', data)
        .then((data) => {
          if (data.error) {
            ui.showAlert(`${data.error}`, 'alert alert-danger');
          } else {
            ui.showAlert('Post added', 'alert alert-success');
            ui.clearFields();
            getPosts();
          }
        })
        .catch((err) => console.log(err));
    } else {
      http
        .put(`/api/posts/${id}`, data)
        .then((data) => {
          ui.showAlert('Post updated', 'alert alert-success');
          ui.changeFormState('add');
          getPosts();
        })
        .catch((err) => console.log(err));
    }
  }
}

function deletePost(e) {

  e.preventDefault();

  if (e.target.parentElement.classList.contains('delete')) {
    const id = e.target.parentElement.dataset.id;
    if (confirm('Are you sure?')) {
      http
        .delete(`/api/posts/${id}`)
        .then((data) => {
          ui.showAlert('Post Removed', 'alert alert-success');
          getPosts();
        })
        .catch((err) => {
          console.log(err); 
        });
    }
  }
}

function enableEdit(e) {
  if (e.target.parentElement.classList.contains('edit')) {
    const id = e.target.parentElement.dataset.id;
    const body = e.target.parentElement.previousElementSibling.textContent;
    const title =
      e.target.parentElement.previousElementSibling.previousElementSibling
        .textContent;

    const data = {
      id,
      title,
      body,
    };

    ui.fillForm(data);
  }
  e.preventDefault();
}

function cancelEdit(e) {
  if (e.target.classList.contains('post-cancel')) {
    ui.changeFormState('add');
  }
  e.preventDefault();
}
