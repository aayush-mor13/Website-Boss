
import {useState} from 'react';
import CompanyForm from './CompanyForm';
import DomainSearch from './DomainSearch';

function CreateWebsite() {
  const [selectedDomain, setSelectedDomain] = useState('');
  return (
    <div>
      <DomainSearch setSelectedDomain={setSelectedDomain} />
      {selectedDomain && (
        <CompanyForm selectedDomain={selectedDomain} />
      )}
    </div>
  )
}

export default CreateWebsite
