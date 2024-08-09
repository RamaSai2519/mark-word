import { message } from "antd";
import { saveScriptToFile } from "./fileUtils.js";
import { runPythonScript } from "./ipcRendererUtils.js";
import raxios from "./axios_helper.js";

export const fetchAndRunScript = async (command) => {
    try {
        const response = await raxios.get('/get_code', {
            params: {
                command: command
                
            }
        });
        const scriptContent = response.data.code;
        const scriptPath = saveScriptToFile(scriptContent);
        runPythonScript(scriptPath);
    } catch (error) {
        message.error('Failed to fetch the script');
        console.error('Error fetching the script:', error);
    }
};