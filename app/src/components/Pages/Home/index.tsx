import { useAuth } from "../../../hooks/AuthContext";


const Home: React.FC = () => {
    const { user } = useAuth()
    return (
      <Container fluid={true}>
        <Row>
          <Col sm={12} md={3}>
            Home
          </Col>
          <Col sm={12} md={9}>
            <Stats />
          </Col>
        </Row>
      </Container >
    );
  };
  
  export default Home;