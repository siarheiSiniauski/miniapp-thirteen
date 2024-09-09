import React, { useEffect, useRef, useState } from 'react';

export const RevolverDrum: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [angle, setAngle] = useState(0);

  // Загружаем изображение барабана
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    const drumImage = new Image();
    drumImage.src = './revolver.png'; // Укажите путь к изображению барабана

    drumImage.onload = () => {
      drawDrum(ctx, drumImage, angle);
    };
  }, [angle]);

  // Функция для отрисовки барабана с учетом угла вращения
  const drawDrum = (
    ctx: CanvasRenderingContext2D,
    image: HTMLImageElement,
    angle: number
  ) => {
    const canvas = ctx.canvas;
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;

    // Очистка Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Сохранение состояния Canvas
    ctx.save();
    ctx.translate(centerX, centerY);

    // Вращение
    ctx.rotate(angle);

    // Размер барабана
    const drumSize = 200;
    ctx.drawImage(image, -drumSize / 2, -drumSize / 2, drumSize, drumSize);

    // Восстановление состояния
    ctx.restore();
  };

  // Функция для обновления угла и запуска анимации
  const spinDrum = () => {
    if (!isSpinning) return;

    setAngle((prevAngle) => prevAngle + 0.1);
    requestAnimationFrame(spinDrum); // Запуск анимации
  };

  // Обработчик клика для запуска/остановки вращения
  const handleClick = () => {
    setIsSpinning(!isSpinning);
    if (!isSpinning) {
      requestAnimationFrame(spinDrum);
    }
  };

  console.log(isSpinning);

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={513.734}
        height={513.734}
        // style={{ backgroundColor: '#333', display: 'block', margin: '0 auto' }}
        onClick={handleClick}
      />
    </div>
  );
};
