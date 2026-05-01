let isDragging = false;
let isMouseDown = false; // 声明 isMouseDown 变量
let startX, startY, initialBackgroundPosX, initialBackgroundPosY;

// 当鼠标按下时开始拖动
document.body.addEventListener('mousedown', (e) => {
    if (e.target.id === 'clickableImage' || e.target.classList.contains('moving-pic')) {
        return;
    }
  isMouseDown = true;
  isDragging = false;
  //isDragging = ture;

  // 记录鼠标按下时的初始位置
  startX = e.clientX;
  startY = e.clientY;

  // 获取背景的初始位置
  const backgroundPosX = getComputedStyle(document.body).getPropertyValue('--background-pos-x').replace('px', '');
  initialBackgroundPosX = parseInt(backgroundPosX, 10);
  const backgroundPosY = getComputedStyle(document.body).getPropertyValue('--background-pos-y').replace('px', '');
  initialBackgroundPosY = parseInt(backgroundPosY, 10);

  //document.body.classList.add('dragging');
  // 按下鼠标时，先取消滤镜效果
  
  // 添加 dragging 样式
  document.body.classList.add('grabbing');
  //document.body.classList.remove('dragging');
  //document.body.classList.add('active'); // 添加active类用于取消滤镜
});

// 当鼠标移动时拖动背景图片
document.body.addEventListener('mousemove', (e) => {
  if (isDragging) {
    // 计算鼠标移动的距离
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    // 更新伪元素的背景位置
    document.body.style.setProperty('--background-pos-x', `${initialBackgroundPosX + dx}px`);
    document.body.style.setProperty('--background-pos-y', `${initialBackgroundPosY + dy}px`);

    // 当拖动时添加横向模糊滤镜
    //document.body.classList.add('dragging');
  }
  if (isMouseDown) {
    isDragging = true;
    // 拖动时添加横向模糊滤镜
    document.body.classList.add('dragging');
    document.body.classList.remove('active'); // 拖动时移除active类
  }
  
});

// 当鼠标松开时停止拖动
document.body.addEventListener('mouseup', (e) => {
  //isDragging = false;
  // 松开鼠标时移除拖动状态
  //document.body.classList.remove('dragging');
    // 如果是在 #clickableImage 或 .moving-pic 上松开鼠标，不处理
  if (e.target.id === 'clickableImage' || e.target.classList.contains('moving-pic')) {
    return;
  }
  isMouseDown = false;
  document.body.classList.remove('grabbing'); // 松开时移除 grabbing

  if (!isDragging) {
    // 如果鼠标按住但没有拖动，保留取消滤镜的效果
    //document.body.classList.remove('dragging');
    document.body.classList.add('active');
  } else {
    // 拖动完成时移除所有的拖动状态
    document.body.classList.remove('dragging');
    document.body.classList.remove('active');
  }

  isDragging = false;
});

// 当鼠标离开时停止拖动
document.body.addEventListener('mouseleave', (e) => {
  //isDragging = false;
  // 鼠标离开窗口时取消拖动状态
  //document.body.classList.remove('dragging');

  isMouseDown = false;
  isDragging = false;
  document.body.classList.remove('dragging');
  document.body.classList.remove('active');
});

//////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    const image = document.getElementById('clickableImage');
    if (image) {
        image.addEventListener('click', () => {
            window.open(
                'chatbox2.html',
                '_blank',
                'width=400,height=300,left=400,top=300'
            );
        });
    }
});
//////////////////////////////////////////////////



// // 为文字添加点击事件，打开聊天窗口
// document.getElementById('chatLink').addEventListener('click', function() {
//     window.open('chatbox2.html', '_blank', 'width=500,height=400,left=300,top=100'); // 打开聊天窗口
// });

let animationRunning = false; // Flag to prevent multiple animations
const speeds = [];

// Function to make images move and bounce
function animatePics() {
    const pics = document.querySelectorAll('.moving-pic');

    // Only initialize positions and speeds once
    if (!animationRunning) {
        pics.forEach((pic, index) => {
            pic.style.top = Math.random() * (window.innerHeight - pic.offsetHeight) + 'px';
            pic.style.left = Math.random() * (window.innerWidth - pic.offsetWidth) + 'px';
            
            speeds[index] = {
                x: (Math.random() * 1 + 0.5) * (Math.random() > 0.5 ? 1 : -1), // Random speed and direction
                y: (Math.random() * 1 + 0.5) * (Math.random() > 0.5 ? 1 : -1)
            };
        });

        animationRunning = true; // Set the flag to true
        updatePositions(); // Start animation
    }
}

// Function to update positions and handle bouncing
function updatePositions() {
    const pics = document.querySelectorAll('.moving-pic');

    pics.forEach((pic, index) => {
        let rect = pic.getBoundingClientRect();

        // Update position based on speed
        let newLeft = rect.left + speeds[index].x;
        let newTop = rect.top + speeds[index].y;

        // Bounce off the edges
        if (newLeft <= 0 || newLeft + rect.width >= window.innerWidth) {
            speeds[index].x *= -1; // Reverse horizontal direction
        }
        if (newTop <= 0 || newTop + rect.height >= window.innerHeight) {
            speeds[index].y *= -1; // Reverse vertical direction
        }

        // Apply new positions
        pic.style.left = newLeft + 'px';
        pic.style.top = newTop + 'px';
    });

    requestAnimationFrame(updatePositions); // Continue the animation
}

// Ensure only the initial animation starts
window.addEventListener('load', animatePics);

// Adjust positions without reinitializing on resize
window.addEventListener('resize', () => {
    const pics = document.querySelectorAll('.moving-pic');
    pics.forEach((pic) => {
        // Adjust position without changing speeds or restarting animations
        pic.style.top = Math.min(parseFloat(pic.style.top), window.innerHeight - pic.offsetHeight) + 'px';
        pic.style.left = Math.min(parseFloat(pic.style.left), window.innerWidth - pic.offsetWidth) + 'px';
    });
});

/////////////////////////////////////

document.addEventListener('DOMContentLoaded', () => {
    // 选择所有移动的图片
    const movingPics = document.querySelectorAll('.moving-pic');

    // 为每个图片添加点击事件
    movingPics.forEach(pic => {
        pic.addEventListener('click', () => {
            let url, width, height, left, top;

            // 根据图片的 ID 设定不同的窗口属性
            switch (pic.id) {
                case 'pic1':
                    url = 'page1.html';
                    width = 200;
                    height = 300;
                    left = 100;
                    top = 100;
                    break;
                case 'pic2':
                    url = 'page2.html';
                    width = 100;
                    height = 200;
                    left = 200;
                    top = 150;
                    break;
                case 'pic3':
                    url = 'page3.html';
                    width = 200;
                    height = 200;
                    left = 300;
                    top = 200;
                    break;
                case 'pic4':
                    url = 'page4.html';
                    width = 408;
                    height = 100;
                    left = 700;
                    top = 400;
                    break;
                case 'pic5':
                    url = 'page5.html';
                    width = 300;
                    height = 200;
                    left = 200;
                    top = 150;
                    break;
                case 'pic6':
                    url = 'page6.html';
                    width = 200;
                    height = 100;
                    left = 300;
                    top = 200;
                    break;
                // 添加更多图片的情况
                default:
                    url = 'default.html';
                    width = 400;
                    height = 300;
                    left = 400;
                    top = 100;
                    break;
            }

            // 打开新窗口
            window.open(
                url,          // 打开的页面 URL
                '_blank',     // 在新窗口中打开
                `width=${width},height=${height},left=${left},top=${top}` // 窗口大小和位置
            );
        });
    });
});

window.onload = function() {
    // Get the popup and buttons
    const popup = document.getElementById("messagePopup");
    const closeBtn = document.getElementById("closeBtn");
    const acceptBtn = document.getElementById("acceptBtn");
  
    // Function to display the popup
    function showPopup() {
      popup.style.display = "block";
    }
  
    // Initially display the popup after 2 seconds
    setTimeout(showPopup, 2000);
  
    // Close the popup and re-display it after 5 seconds
    closeBtn.onclick = function() {
      popup.style.display = "none";
      setTimeout(showPopup, 1000); // Reappear after 1 seconds
    };
  
    // Redirect to forum.html when "Accept" is clicked
    acceptBtn.onclick = function() {
    window.open('forum/forum.html', '_blank', 'width=1200,height=800'); // Opens the page in a new window
  };
  
};
