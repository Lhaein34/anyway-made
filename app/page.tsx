export default function Home() {
  return (
      <main style={{ padding: '80px', fontFamily: 'sans-serif' }}>
        <h1 style={{ fontSize: '48px', marginBottom: '16px' }}>
          아무튼 만들어봄
        </h1>

        <p style={{ fontSize: '20px' }}>
          필요해서가 아니라 만들고 싶어서 만듭니다.
        </p>
        <p style={{ fontSize: '20px', marginBottom: '48px' }}>
          일단 만들어보고 생각합니다.
        </p>

        <section>
          <h2 style={{ fontSize: '28px', marginBottom: '16px' }}>
            만든 것들
          </h2>

          <div
              style={{
                border: '1px solid #ccc',
                padding: '20px',
                width: '300px',
              }}
          >
            <h3>🍅 휘청휘청 토마토</h3>
            <p style={{ fontSize: '14px', marginBottom: '8px' }}>
              술 마신 토마토가 휘청거리며 버티는 게임
            </p>
            <p style={{ fontSize: '12px', color: '#666' }}>
              준비 중
            </p>
          </div>
        </section>
      </main>
  );
}
