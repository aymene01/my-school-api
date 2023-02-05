type Signal = 'SIGINT' | 'SIGTERM'

export const waitForSignal = (signals: Signal[]): Promise<string> =>
	new Promise(resolve => {
		signals.forEach(signal => {
			process.on(signal, () => resolve(signal))
		})
	})
