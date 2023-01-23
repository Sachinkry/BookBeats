// import 'Configuration' and 'OpenAIApi' classes
import { Configuration, OpenAIApi} from 'openai';

// create a new instance of the Configuration class by passing in your API key
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY
});

// create a new instance of the OpenAIApi class by passing in your configuration
const openai = new OpenAIApi(configuration);


const generateDescription = async (req, res) => {
  // run first prompt
  const bookName = req.body.query;
  const basePromptPrefix = ``
  
  console.log(`API: Running...${basePromptPrefix}`)
  // calls the createCompletion method specifying the mode, prompt, temperature, and max tokens
  const baseCompletion = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `${basePromptPrefix}`,
    temperature: 0.7,
    max_tokens: 700
  })
  console.log("success: ", baseCompletion.data.choices[0].text)

  // get the text from the choices array
  const basePromptOutput = baseCompletion.data.choices[0].text

  // send the text to the client
  res.status(200).json({ basePromptOutput });
}

export default generateDescription;
