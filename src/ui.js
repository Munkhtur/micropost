class UI {
  constructor() {
    this.post = document.querySelector('.posts');
    this.titleInput = document.querySelector('#title');
    this.bodyInput = document.querySelector('#body');
    this.idInput = document.querySelector('#id');
    this.postSubmit = document.querySelector('.post-submit');
    this.formState = 'add';
  }
  sort(a, b) {
    return a - b;
  }

  showPosts(posts) {
    posts.sort((a, b) => a - b);
    let output = '';
    posts.forEach((post) => {
      output += `
            <div class="card mb-3">
                <div class="card-body">
                    <h4 class="card-title">${post.name}</h4>
                    <p class="card-text">${post.body}</p>
                    <a href="#" class="edit card-link" data-id="${post.id}">
                        <i class="fa fa-pencil"></i>
                    </a>
                    <a href="#" class="delete card-link" data-id="${post.id}">
                        <i class="fa fa-remove"></i>
                    </a>
                </div>
            </div>
        `;
    });
    this.post.innerHTML = output;
  }
  showAlert(message, className) {
    this.clearAlert();
    const div = document.createElement('div');
    div.className = className;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.postsContainer');
    const posts = document.querySelector('.posts');
    container.insertBefore(div, posts);
    setTimeout(() => {
      this.clearAlert();
    }, 3000);
  }
  clearAlert() {
    const currentAlrt = document.querySelector('.alert');
    if (currentAlrt) {
      currentAlrt.remove();
    }
  }
  clearFields() {
    this.titleInput.value = '';
    this.bodyInput.value = '';
  }

  fillForm(data) {
    this.titleInput.value = data.title;
    this.bodyInput.value = data.body;
    this.idInput.value = data.id;

    this.changeFormState('edit');
  }
  changeFormState(type) {
    if (type === 'edit') {
      this.postSubmit.textContent = 'Update Post';
      this.postSubmit.className = 'post-submit btn btn-warning btn-clock';

      const button = document.createElement('button');
      button.className = 'post-cancel btn btn-light btn-block mt-3';
      button.appendChild(document.createTextNode('Cancel edit'));
      const cardForm = document.querySelector('.card-form');
      const formEnd = document.querySelector('.form-end');
      cardForm.insertBefore(button, formEnd);
    } else {
      this.postSubmit.textContent = 'Post it';
      this.postSubmit.className = 'post-submit btn btn-primary btn-clock';
      if (document.querySelector('.post-cancel')) {
        document.querySelector('.post-cancel').remove();
      }
      this.clearIdInput();
      this.clearFields();
    }
  }
  clearIdInput() {
    this.idInput.value = '';
  }
}

export const ui = new UI();
