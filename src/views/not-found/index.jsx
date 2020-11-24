import img from '@/assets/images/404.png';

function NotFound() {
    return (
        <div style={{
            height: '100%',
            background: '#ececec',
            overflow: 'hidden',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <img src={img} alt="404" className='animate__animated animate__swing' />
        </div>
    )
}

export default NotFound;
