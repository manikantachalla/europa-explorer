import { Container, Typography } from '@mui/material';
import SimulatorForm from './components/SimulatorForm';

function App() {
  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" sx={{ mt: 4, mb: 2 }}>
        Europa Robot Simulator 🚀
      </Typography>
      <SimulatorForm />
    </Container>
  );
}

export default App;
