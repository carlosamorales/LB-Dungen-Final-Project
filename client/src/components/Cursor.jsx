import React, { useEffect } from 'react';
let mounted = false;

const Cursor = () => {
  useEffect(() => {
    if (mounted) return;
    mounted = true;

    const cursor = document.createElement('img');
    cursor.src = '/src/assets/LD_Bat_100px.png';
    cursor.style.position = 'fixed';
    cursor.style.pointerEvents = 'none';
    document.body.appendChild(cursor);

    const handleMouseMove = (e) => {
      cursor.style.left = e.clientX + 'px';
      cursor.style.top = e.clientY + 'px';
    };

    document.addEventListener('mousemove', handleMouseMove);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.body.removeChild(cursor);
    };
  }, []);

  return null;
};

export default Cursor;
