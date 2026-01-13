'use client';

import { useEffect, useRef, useState } from 'react';

export default function WobblyTomato() {
    const [angle, setAngle] = useState(0); // 앞(+)/뒤(-) 기울기
    const [time, setTime] = useState(0);
    const [over, setOver] = useState(false);
    const raf = useRef<number | null>(null);

    // 자동 휘청 (난이도 상승)
    useEffect(() => {
        if (over) return;

        const tick = () => {
            setAngle((a) => a + (Math.random() - 0.5) * (1.2 + time * 0.12));
            setTime((t) => +(t + 0.016).toFixed(3));
            raf.current = requestAnimationFrame(tick);
        };

        raf.current = requestAnimationFrame(tick);
        return () => {
            if (raf.current !== null) cancelAnimationFrame(raf.current);
        };
    }, [over, time]);

    // 넘어짐 판정
    useEffect(() => {
        if (Math.abs(angle) > 35) setOver(true);
    }, [angle]);

    // 균형 조작
    const balance = (dir: -1 | 1) => {
        if (over) return;
        setAngle((a) => a + dir * 6);
    };

    // 키보드
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') balance(-1);  // 뒤로
            if (e.key === 'ArrowRight') balance(1); // 앞으로
            if (e.key === 'r') window.location.reload();
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [over]);

    return (
        <main
            style={{
                padding: 40,
                textAlign: 'center',
                fontFamily: 'sans-serif',
                minHeight: '100vh',
                background: 'linear-gradient(#1b1b1b, #0f0f0f)',
                color: '#fff',
            }}
        >
            <h1>🍅 휘청휘청 토마토</h1>
            <p>버틴 시간: <b>{time.toFixed(2)}초</b></p>

            {/* 캐릭터 */}
            <div style={{ height: 360, marginTop: 40 }}>
                <div
                    style={{
                        width: 140,
                        height: 200,
                        margin: '0 auto',
                        transform: `rotate(${angle}deg)`,
                        transformOrigin: 'bottom center',
                        transition: over ? 'transform 0.4s ease-in' : 'transform 0.05s linear',
                        position: 'relative',
                    }}
                >
                    {/* 초록 꼭지 */}
                    <div
                        style={{
                            position: 'absolute',
                            top: -18,
                            left: '50%',
                            width: 30,
                            height: 18,
                            background: '#2ecc71',
                            borderRadius: '0 0 20px 20px',
                            transform: 'translateX(-50%)',
                        }}
                    />

                    {/* 토마토 몸 */}
                    <div
                        style={{
                            width: 120,
                            height: 120,
                            background: '#e63946',
                            borderRadius: '50%',
                            margin: '0 auto',
                            position: 'relative',
                        }}
                    >
                        {/* 취한 눈 */}
                        <div style={{
                            position: 'absolute',
                            top: 40,
                            left: 28,
                            width: 16,
                            height: 6,
                            background: '#000',
                            borderRadius: 4,
                        }} />
                        <div style={{
                            position: 'absolute',
                            top: 42,
                            right: 28,
                            width: 14,
                            height: 4,
                            background: '#000',
                            borderRadius: 4,
                        }} />

                        {/* 비뚤어진 입 */}
                        <div style={{
                            position: 'absolute',
                            bottom: 28,
                            left: '50%',
                            width: 26,
                            height: 6,
                            background: '#000',
                            borderRadius: 6,
                            transform: 'translateX(-50%) rotate(-8deg)',
                        }} />
                    </div>

                    {/* 팔 */}
                    <div style={{
                        position: 'absolute',
                        top: 70,
                        left: -18,
                        width: 30,
                        height: 6,
                        background: '#c92d3a',
                        transform: 'rotate(-25deg)',
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: 70,
                        right: -18,
                        width: 30,
                        height: 6,
                        background: '#c92d3a',
                        transform: 'rotate(35deg)',
                    }} />

                    {/* 다리 (흔들림) */}
                    <div style={{
                        position: 'absolute',
                        bottom: -70,
                        left: 50,
                        width: 6,
                        height: 70,
                        background: '#c92d3a',
                        animation: over ? 'none' : 'leg 0.4s infinite alternate',
                    }} />
                    <div style={{
                        position: 'absolute',
                        bottom: -70,
                        right: 50,
                        width: 6,
                        height: 70,
                        background: '#c92d3a',
                        animation: over ? 'none' : 'leg 0.4s infinite alternate-reverse',
                    }} />
                </div>
            </div>

            {/* 바닥 */}
            <div
                style={{
                    margin: '20px auto 0',
                    width: 300,
                    height: 4,
                    background: '#ffffff33',
                    borderRadius: 2,
                }}
            />

            {!over ? (
                <p style={{ marginTop: 20 }}>← 뒤로 / → 앞으로 균형 잡기</p>
            ) : (
                <>
                    <h2>💥 넘어졌다!</h2>
                    <button onClick={() => window.location.reload()}>
                        다시 술 마시기 (R)
                    </button>
                </>
            )}
        </main>
    );
}
