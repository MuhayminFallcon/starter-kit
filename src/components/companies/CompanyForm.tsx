  // src/components/companies/CompanyForm.tsx
import AppBarComponent from './DenseAppBar';
import HeroSection from '@components/HeroSection'
import SectionDetails from '@components/companies/SectionDetails'
import FeaturesSection from '@components/companies/FeaturesSection'
import ProductList from '@components/companies/ProductList'
import CompanyFooter from '@components/companies/layout/Footer'
  import Footer from '@components/companies/layout/Footer'

const CompanyForm = () => {
  const footerData = {
    logo: '',
    sections: [],
    socialMediaLinks: ['https://facebook.com', 'https://twitter.com', 'https://instagram.com'],
    contactNumber: '123-456-7890',
    copyright: '© 2023 Company Name',
    location: '123 Main St, Anytown, USA',
    emailContact: 'info@company.com',
    phoneContact: '123-456-7890',
    socialLinks: [],
  };

  return (
    <div>
      <AppBarComponent />
      <HeroSection />
      <SectionDetails />
      <FeaturesSection features={[]} />
      <ProductList products={[]} isMobile={false} />
      <CompanyFooter footerData={footerData} />
    </div>
  );
};

export default CompanyForm;
