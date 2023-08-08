import Row from "./components/Row";

export default function App() {
  return (
    <>
      <div className="bg-black/90 h-screen w-screen bg-white/">
        <main className="container flex flex-col items-center justify-center h-screen w-full gap-1 mx-auto">
          <Row rowNumber={0}></Row>
          <Row rowNumber={1}></Row>
          <Row rowNumber={2}></Row>
          <Row rowNumber={3}></Row>
          <Row rowNumber={4}></Row>
          <Row rowNumber={5}></Row>
        </main>
      </div>
    </>
  )
}