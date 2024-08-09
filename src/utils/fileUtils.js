const fs = window.require('fs');
const path = window.require('path');
const os = window.require('os');

export const saveScriptToFile = (scriptContent, filename = 'fetched_script.py') => {
  const tempDir = os.tmpdir();
  const scriptPath = path.join(tempDir, filename);
  fs.writeFileSync(scriptPath, scriptContent, 'utf-8');
  return scriptPath;
};

export const getPCInfo = () => {
  return {
    platform: os.platform(),
    arch: os.arch(),
    cpus: os.cpus(),
    tmpdir: os.tmpdir(),
    homedir: os.homedir(),
    hostname: os.hostname(),
    userInfo: os.userInfo(),
  };
};

