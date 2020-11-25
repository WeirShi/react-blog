import img from '@/assets/images/404.svg';

function NotFound() {
    return (
        <div style={{
            height: '100%',
            background: '#fff',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <img
                className='animate__animated animate__swing'
                alt="404"
                src={img}
                style={{ width: '440px' }}
            />
        </div>
    )
}

export default NotFound;
