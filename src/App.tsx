import Row from "./components/Row";

export default function App() {
  return (
    <>
      <div className="bg-black/90 h-screen w-screen bg-white/">
        <main className="container flex flex-col items-center justify-center h-screen w-full gap-1">
          <Row></Row>
          <Row></Row>
          <Row></Row>
          <Row></Row>
          <Row></Row>
          <Row></Row>
        </main>
      </div>
    </>
  )
}