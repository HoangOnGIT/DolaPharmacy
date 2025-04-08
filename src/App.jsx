import "./App.css";
import Footer from "./common/Footer/Footer";
import Header from "./common/Header/Header";
import Modal from "./common/Header/Modal";
import FloatingButton from "./common/FloatingButton/FloatingButtons";

function App() {
  return (
    <>
      <Header />
      <div style={{ height: "300vh", background: "#f0f0f0" }}>
        Nội dung cuộn ở đây
      </div>
      <Footer />
      <FloatingButton />
    </>
  )
}

export default App;
