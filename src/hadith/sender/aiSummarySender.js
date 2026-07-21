import { authFetch, switchServer, getToken } from './api';

var controller = null;

export const requestAiSummary = function (dispatch, arabic, indonesia) {
    // 1. Cancel any previous in-flight request
    if (controller) {
        controller.abort();
    }

    // 2. Don't request if user is not signed in
    if (!getToken()) {
        dispatch({ type: 'AI_SUMMARY_CLEAR' });
        return;
    }

    // 3. Clear current summary immediately
    dispatch({ type: 'AI_SUMMARY_CLEAR' });

    // 4. No text to summarize
    if (!arabic || !indonesia) return;

    // 5. Create new AbortController
    controller = new AbortController();
    var signal = controller.signal;

    // 6. Dispatch loading state
    dispatch({ type: 'AI_SUMMARY_START' });

    // 7. Build prompt
    var prompt = 'Teks Arab:\n' + arabic + '\n\nTeks Indonesia:\n' + indonesia;

    // 8. Fire the request
    authFetch(switchServer + 'ai/ask', {
        method: 'POST',
        body: JSON.stringify({
            prompt: prompt,
            system: 'Kamu adalah ulama ahli al quran dan hadits serta fiqh dalam islam, Saya akan memberikan teks hadits dalam bahasa Arab dan terjemahannya.\n' +
                'Buatlah ringkasan hadits dengan ketentuan berikut:\n' +
                'Ringkasan harus sesuai dengan makna hadits dan tidak menyimpang dari teks.\n' +
                'Jangan menambahkan informasi yang tidak memiliki dasar.\n' +
                'Jika diperlukan penjelasan tambahan, gunakan hanya dalil dari Al-Qur\'an, hadits shahih/hasan lain yang relevan, atau penjelasan ulama yang masyhur berdasarkan dalil.\n' +
                'Bedakan dengan jelas antara:\n' +
                'Isi hadits (apa yang disebutkan dalam hadits),\n' +
                'Penjelasan tambahan (berdasarkan dalil lain atau syarah ulama).\n' +
                'Jika tidak mengetahui alasan suatu hukum dari dalil lain, katakan bahwa hadits ini tidak menjelaskan alasannya. Jangan membuat dugaan atau hikmah sendiri.\n' +
                'Jangan menyebutkan sesuatu sebagai sebab (\'illah) kecuali memang ada dalil yang menjelaskannya.\n' +
                'Jangan menganggap beberapa perkara memiliki alasan yang sama hanya karena disebutkan bersamaan atau berdampingan (kecuali ada dalil shahih/hasan), contoh dilarang bersuci dengan tulang dan kotoran hewan, masing-masing memiliki alasannya tersendiri yang harus disebutkan.\n' +
                'Gunakan bahasa Indonesia yang ringkas, jelas, dan mudah dipahami.\n' +
                'Jika terdapat perbedaan pendapat ulama yang penting, sebutkan secara singkat,\n' +
                'Format output\n' +
                'Ringkasan Hadits {nama_kitab: nomer_hadits}\n' +
                'Inti Hadits:\n' +
                '...\n' +
                'Poin Penting:\n' +
                '...\n' +
                '...\n' +
                'Penjelasan Tambahan (berdasarkan dalil lain):\n' +
                '...\n' +
                '...\n' +
                'Pelajaran:\n' +
                '...\n' +
                '...'
        }),
        signal: signal
    })
        .then(function (res) {
            if (!res.ok) throw new Error('AI request failed');
            return res.json();
        })
        .then(function (data) {
            if (!signal.aborted) {
                dispatch({ type: 'AI_SUMMARY_SUCCESS', summary: data.reply });
            }
        })
        .catch(function (err) {
            if (err.name === 'AbortError') return;
            if (!signal.aborted) {
                dispatch({ type: 'AI_SUMMARY_FAIL', error: err.message });
            }
        });
};
