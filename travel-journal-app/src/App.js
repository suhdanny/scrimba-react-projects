import './App.css';
import Card from './components/Card';
import Navbar from './components/Navbar'
import data from './data';

function App() {

  const cards = data.map(item => <Card key={item.id} {...item}/>)

  return (
    <div className='main'>
        <Navbar />
        <section className='card-container'>
          {cards}
        </section>
    </div>
  );
}

export default App;