import Layout from '../global/Layout';
import CardComponent from './Card';

export default function Home({ username }) {
 return (
  <>
   <Layout>
    <div className='mb-5 mt-5 '>
     <h1>
      Welcome, <span style={{ color: 'Highlight' }}>{username}</span> to Management Apps
     </h1>
    </div>
    <div className='d-flex gap-5'>
     <CardComponent />
     <CardComponent type='category' />
    </div>
   </Layout>
  </>
 );
}
