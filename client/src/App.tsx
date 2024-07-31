import styles from './App.module.css';
import { Aside } from './components/Aside';
import Header from './components/Header';
import { Footer } from './components/Footer';
import Main from './components/Main';

const App = () => {

  return (
    <div className={styles.wrapper}>
      <Header />
        <Aside />
        <Main />
        <Footer />
    </div>
  )
}

export default App;
