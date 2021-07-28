// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import Footer from '../components/_external-pages/landing/Footer';
// components
import Page from '../components/Page';
import { LandingHero, LandingFeatures, LandingHowItWorks, LandingLabs } from '../components/_external-pages/landing';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)({
  height: '100%'
});

const ContentStyle = styled('div')(({ theme }) => ({
  overflow: 'hidden',
  position: 'relative',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function LandingPage() {
  return (
    <RootStyle title="Seylabs | Home of Laboratory Testing" id="move_top">
      <LandingHero />
      <ContentStyle>
        <LandingFeatures />
        <LandingHowItWorks />
        <LandingLabs />
      </ContentStyle>
    </RootStyle>
  );
}
