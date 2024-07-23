import axios from 'axios';

export const API_URL = 'http://192.168.31.86:5152/api';

export interface Company {
  name: string;
  subDomain: string;
  heroTitle: string;
  heroDescription: string;
  sectionImage: string;
  sectionTitle: string;
  sectionDescription: string;
  heroImage: string;
  logoImage: string;
  productsImages: string[];
  servicesImages: string[];
  location: string;
  emailContact: string;
  phoneContact: string;
  socialMediaLinks: string[];
  tagline: string;
  whoWeAreLinks: { href: string; text: string }[];
  projectsLinks: { href: string; text: string }[];
  whatWeDoLinks: { href: string; text: string }[];
  socialLinks: { href: string; icon: string }[];
  features: { title: string; description: string }[];
  id: string;
  creationDate: string;
}

export interface CompaniesResponse {
  data: Company[];
  pagesCount: number;
  currentPage: number;
  type: string;
  totalCount: number;
}

export class CompanyService {
  static async fetchCompanies(): Promise<CompaniesResponse> {
    const response = await axios.get<CompaniesResponse>(`${API_URL}/companies`, {
      headers: {
        'Accept': 'text/plain',
      },
    });
    return response.data;
  }
}
