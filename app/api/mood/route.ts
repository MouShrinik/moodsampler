import { HfInference, TextClassificationOutput } from '@huggingface/inference'

let hfm: HfInference;

export async function POST(req: Request, res: Response) {
    const { input } = await req.json();
    const inferenceResponse: TextClassificationOutput = await runInference(input)
    // console.log(inferenceResponse)
    
    const filteredResponse = filterResponses([...inferenceResponse])
    return new Response(JSON.stringify({
        inferenceResponse,
        filteredResponse,
    }), { status: 200 })
}

// 
async function runInference(input: string) {
    if (!hfm) {
        hfm = new HfInference(process.env.HFM_TOKEN)
    }
    const modelName = "SamLowe/roberta-base-go_emotions";
    const inferenceRes = await hfm.textClassification({
        model: modelName,
        inputs: input,
    });
    return inferenceRes
}

function filterResponses(moods: TextClassificationOutput) {
    const filtered = []
    const mood0 = moods.shift()
    filtered.push(mood0)
    let score = mood0?.score;
    while (moods.length > 0) {
        const moodI = moods.shift()
        if (moodI?.score! > score! * 0.5) {
            filtered.push(moodI)
            score = moodI?.score;
        } else {
            break;
        }
    }
    return filtered;
}