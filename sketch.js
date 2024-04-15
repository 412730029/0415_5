let kiji = ["#d4a276", "#895737"];
let choco = ["#f9bec7", "#522500", "#6a994e"];

var balls = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
  background("#F2EDEC");

  let cells = 5;
  let offset = height / 10;
  let margin = offset / 2.5;
  let w = (width - offset * 2 - margin * (cells - 1)) / cells;
  let h = (height - offset * 2 - margin * (cells - 1)) / cells;

  for (let j = 0; j < cells; j++) {
    for (let i = 0; i < cells; i++) {
      let x = offset + i * (w + margin);
      let y = offset + j * (h + margin);

      let cx = x + w / 2;
      let cy = y + h / 2;
      let d = h;

      let rotate_num = 0; // 將旋轉角度設為 0，停止旋轉
      let shape_num = int(random(4));
      let speed_x = random(-2, 2); // 隨機生成 x 方向速度
      let speed_y = random(-2, 2); // 隨機生成 y 方向速度

      let ball = {
        p: { x: cx, y: cy },    // 球的位置
        r: d,                   // 球的大小
        color: random(kiji),    // 球的顏色
        v: { x: speed_x, y: speed_y } // 球的移動速度，有兩個屬性 (x, y)
      };

      balls.push(ball); // 把產生的球體推(存)入到 balls 陣列內
    }
  }
}

function draw() {
  background("#F2EDEC");

  for (let j = 0; j < balls.length; j++) {
    let ball = balls[j];

    // 繪製球體
    push();
    translate(ball.p.x, ball.p.y);
    let d = ball.r;
    let rotate_num = 0;
    let shape_num = int(random(4)); // 不再計算旋轉角度

    if (shape_num == 0) {
      // モコモコ
      push();

      drawingContext.setLineDash([1, 20]);
      strokeWeight(d / 2.5);
      stroke(random(kiji));
      noFill();
      circle(0, 0, d * 0.8);

      strokeWeight(d / 2.8);
      stroke(random(choco));
      circle(0, 0, d * 0.7);

      pop();
    } else if (shape_num == 1) {
      // ノーマル
      strokeWeight(d / 2.5);
      stroke(random(kiji));
      noFill();
      circle(0, 0, d * 0.8);

      strokeWeight(d / 3.5);
      stroke(random(choco));
      circle(0, 0, d * 0.7);
    } else if (shape_num == 2) {
      // ハーフ
      strokeWeight(d / 2.5);
      stroke(random(kiji));
      noFill();
      circle(0, 0, d * 0.8);

      strokeWeight(d / 2.3);
      stroke(random(choco));
      strokeCap(SQUARE);
      arc(0, 0, d * 0.8, d * 0.8, 0, 180);
    } else if (shape_num == 3) {
      // クルーラー
      push();

      drawingContext.setLineDash([3, 20]);
      strokeWeight(d / 2);
      noFill();
      stroke(random(kiji));
      circle(0, 0, d * 0.8);

      strokeWeight(d / 2);
      stroke("#895737");
      strokeCap(SQUARE);
      circle(0, 0, d * 0.8);
      pop();
    }

    pop();

    // 更新球體位置
    ball.p.x += ball.v.x; // x 軸移動
    ball.p.y += ball.v.y; // y 軸移動

    // 碰到畫布邊界時反彈
    if (ball.p.x < 0 || ball.p.x > width) {
      ball.v.x *= -1;
    }

    if (ball.p.y < 0 || ball.p.y > height) {
      ball.v.y *= -1;
    }
  }
}