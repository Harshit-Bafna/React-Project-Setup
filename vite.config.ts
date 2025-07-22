/* eslint-disable no-undef */
/// <reference types="vitest" />
import { defineConfig, loadEnv, type ServerOptions } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

type TMode = 'development' | 'test' | 'production'

interface AppEnv {
    PORT: string
    VITE_ENV: TMode
    BACKEND_PROXY: string
}

const validateEnv = (envMode: TMode, env: AppEnv) => {
    const requiredVars: (keyof AppEnv)[] = ['PORT', 'VITE_ENV', 'BACKEND_PROXY']

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
        proxy: {
            '/api': {
                target: env.BACKEND_PROXY,
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path.replace(/^\/api/, ''),
            },
        },
    }

    return {
        plugins: [react(), tailwindcss()],
        test: {
            globals: true,
            environment: 'jsdom',
            setupFiles: 'src/setupTests.ts',
            include: ['src/**/*.{test,spec}.{ts,tsx}'],
            coverage: {
                reporter: ['text', 'json', 'html'],
                include: ['src/**/*.{ts,tsx}'],
                exclude: [
                    'src/**/*.test.{ts,tsx}',
                    'src/**/*.spec.{ts,tsx}',
                    'src/setupTests.ts',
                    'src/vite-env.d.ts',
                    'src/main.tsx',
                    'src/index.tsx',
                    'coverage',
                    'dist',
                    'node_modules',
                    'build',
                ],
                thresholds: {
                    statements: 5,
                    branches: 5,
                    functions: 5,
                    lines: 5,
                },
            },
        },
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
        rollupOptions: {
            external: [/.*\.(test|spec)\.(ts|tsx)$/],
        },
    }
})
