import React, { useState } from 'react';
import { useAppContext } from '../context/AppContext';

const Settings: React.FC = () => {
  const { theme, updateTheme, setRpcEndpoint } = useAppContext();
  const [logo, setLogo] = useState(theme.logo);
  const [primaryColor, setPrimaryColor] = useState(theme.primaryColor);
  const [fontFamily, setFontFamily] = useState(theme.fontFamily);
  const [rpcEndpoint, setRpcEndpointLocal] = useState('');
  const [programId, setProgramId] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateTheme({ logo, primaryColor, fontFamily });
    setRpcEndpoint(rpcEndpoint, programId);
    alert('Settings saved successfully!');
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Settings</h1>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label htmlFor="logo" className="block mb-1">Logo URL</label>
          <input
            type="url"
            id="logo"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            className="w-full p-2 border rounded bg-surface text-text-primary"
          />
        </div>
        <div>
          <label htmlFor="primaryColor" className="block mb-1">Primary Color</label>
          <input
            type="color"
            id="primaryColor"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-full p-2 border rounded bg-surface text-text-primary"
          />
        </div>
        <div>
          <label htmlFor="fontFamily" className="block mb-1">Font Family</label>
          <select
            id="fontFamily"
            value={fontFamily}
            onChange={(e) => setFontFamily(e.target.value)}
            className="w-full p-2 border rounded bg-surface text-text-primary"
          >
            <option value="Inter">Inter</option>
            <option value="Roboto">Roboto</option>
            <option value="Open Sans">Open Sans</option>
          </select>
        </div>
        <div>
          <label htmlFor="rpcEndpoint" className="block mb-1">RPC Endpoint</label>
          <input
            type="url"
            id="rpcEndpoint"
            value={rpcEndpoint}
            onChange={(e) => setRpcEndpointLocal(e.target.value)}
            className="w-full p-2 border rounded bg-surface text-text-primary"
          />
        </div>
        <div>
          <label htmlFor="programId" className="block mb-1">Program ID</label>
          <input
            type="text"
            id="programId"
            value={programId}
            onChange={(e) => setProgramId(e.target.value)}
            className="w-full p-2 border rounded bg-surface text-text-primary"
          />
        </div>
        <button type="submit" className="bg-primary text-white px-4 py-2 rounded hover:bg-opacity-80 transition-colors">
          Save Settings
        </button>
      </form>
    </div>
  );
};

export default Settings;