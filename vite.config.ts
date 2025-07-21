/* eslint-disable no-undef */
import { defineConfig, loadEnv, type ServerOptions } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

type TMode = 'development' | 'production'

interface AppEnv {
    PORT: string
    VITE_ENV: TMode
}

const validateEnv = (envMode: TMode, env: AppEnv) => {
    const requiredVars: (keyof AppEnv)[] = ['PORT', 'VITE_ENV']

    for (const key of requiredVars) {
        if (!env[key]) {
            throw new Error(`${key} is missing! Please define it in your .env.${envMode}`)
        }
    }
}

const normalizePort = (port: string) => {
    const normalizedPort = parseInt(port)
    if (isNaN(normalizedPort)) {
        throw new Error(`Invalid port value: ${port}`)
    }

    return normalizedPort
}

export default defineConfig(({ mode }) => {
    const envMode = mode as TMode
    const env = loadEnv(envMode, process.cwd(), '') as unknown as AppEnv

    validateEnv(envMode, env)

    const port = normalizePort(env.PORT)

    const config: ServerOptions = {
        port,
        open: true,
    }

    return {
        plugins: [react(), tailwindcss()],
        resolve: {
            alias: {
                '@features': path.resolve(__dirname, 'src/features'),
                '@shared': path.resolve(__dirname, 'src/features'),
            },
        },
        server: config,
        preview: config,
        build: {
            minify: true,
        },
    }
})
