import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { ThemeProvider, createTheme } from '@mui/material';

const theme = createTheme({
    components: {
      MuiStepIcon: {
        styleOverrides: {
          root: {
            color: '#7947CA', 
            '&.Mui-active': {
              color: '#53308c', 
            },
            '&.Mui-completed': {
                color: '#7947CA', 
            },
          },
        },
      },
    },
  });

const steps = [
  {
    label: 'Sayfa Seç',
    description: 'Projede bulunan birçok sayfa arasından istediğiniz sayfayı yönetici tarafından oluşturulan açılır menüden seçin.',
  },
  {
    label: 'Grid Oluştur',
    description: 'Seçtiğiniz sayfanın yapısını düzenlemek için grid sistemi kullanın. Satır ve sütun sayılarını belirleyerek tasarımınızı oluşturun, ancak değerler 12den fazla olmamalıdır.',
  },
  {
    label: 'Componentleri Sürükle',
    description: 'Sayfanız için özel olarak oluşturduğunuz bileşenleri grid yapısına sürükleyerek tasarımınızı şekillendirin ve düzenleyin.',
  },
  {
    label: 'Kopyala ya da İndir',
    description: 'Tasarımınızı tamamladıktan sonra otomatik olarak oluşturulan kodu butonlara basarak kopyalayabilir veya indirebilirsiniz. Bu sayede projenizi hızla geliştirmeye başlayabilirsiniz.',
  }
];

export default function VerticalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <ThemeProvider theme={theme}>
    <Box sx={{ maxWidth: 800 }}>
      <Stepper  activeStep={activeStep} orientation="vertical">
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              optional={
                index === 3 ? (
                  <Typography variant="caption" color="#7947CA">Son adım</Typography>
                ) : null
              }
            >
              {step.label}
            </StepLabel>
            <StepContent>
              <Typography>{step.description}</Typography>
              <Box sx={{ mb: 2 }}>
                <div>
                  <Button
                    variant="contained"
                    onClick={handleNext}
                    sx={{
                      mt: 1,
                      mr: 1,
                      backgroundColor: '#7947CA',
                      color: '#ffffff',
                      '&:hover': {
                        backgroundColor: '#53308c',
                      },
                    }}
                  >
                    {index === steps.length - 1 ? 'Son' : 'Devam'}
                  </Button>
                  <Button
                    disabled={index === 0}
                    onClick={handleBack}
                    sx={{
                      mt: 1,
                      mr: 1,
                      color:"#7947CA",
                      '&:hover': {
                        backgroundColor: '#efefef',
                      },
                    }}
                  >
                    geri
                  </Button>
                </div>
              </Box>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>Artık sayfanı tasarlamaya hazırsın. Soldan sayfa seçerek başlayabilirsin.</Typography>
          <Button
            onClick={handleReset}
            sx={{
              mt: 1,
              mr: 1,
              backgroundColor: '#7947CA',
              color: '#ffffff',
              '&:hover': {
                backgroundColor: '#53308c',
              },
            }}
          >
            Tekrar oku
          </Button>
        </Paper>
      )}
    </Box>
    </ThemeProvider>
  );
}
