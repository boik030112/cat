// DOM 加载完成后执行（用于 gallery.html 显示作品）
document.addEventListener("DOMContentLoaded", function () {
    const gallery = document.getElementById("gallery");
    
    // 如果存在 gallery 元素，则尝试从 localStorage 中读取作品数据
    if (gallery) {
      let photos = JSON.parse(localStorage.getItem("photos")) || [];
  
      if (photos.length > 0) {
        photos.forEach(photo => {
          const div = document.createElement("div");
          div.classList.add("gallery-item");
  
          const img = document.createElement("img");
          img.src = photo.image;
          img.alt = photo.title;
  
          const title = document.createElement("h3");
          title.textContent = photo.title;
  
          const author = document.createElement("p");
          author.textContent = "摄影师：" + photo.name;
  
          div.appendChild(img);
          div.appendChild(title);
          div.appendChild(author);
          gallery.appendChild(div);
        });
      } else {
        gallery.innerHTML = "<p>暂时没有提交的作品</p>";
      }
    }
  });
  
  // 处理作品提交（适用于 submit.html）
  const uploadForm = document.getElementById("uploadForm");
  if (uploadForm) {
    uploadForm.addEventListener("submit", function (event) {
      event.preventDefault();
  
      const name = document.getElementById("name").value;
      const title = document.getElementById("title").value;
      const description = document.getElementById("description").value;
      const file = document.getElementById("fileInput").files[0];
  
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          // 从 localStorage 获取现有作品数组，如无则新建一个空数组
          let photos = JSON.parse(localStorage.getItem("photos")) || [];
  
          // 将新的作品信息添加到数组中
          photos.push({
            name: name,
            title: title,
            description: description,
            image: e.target.result
          });
  
          // 保存更新后的作品数组到 localStorage
          localStorage.setItem("photos", JSON.stringify(photos));
  
          alert("作品提交成功！");
          // 提交后跳转到作品展示页面
          window.location.href = "gallery.html";
        };
        reader.readAsDataURL(file);
      }
    });
  }