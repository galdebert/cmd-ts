import execa, { ExecaReturnValue } from 'execa';

export function app(
  scriptPath: string
): (args: string[]) => Promise<ExecaReturnValue> {
  return async (args) => {
    jest.setTimeout(10000);
    const result = await execa(
      'node',
      [
        '--nolazy',
        '-r',
        'ts-node/register/transpile-only',
        scriptPath,
        ...args,
      ],
      {
        all: true,
        reject: false,
        env: {
          FORCE_COLOR: 'true',
        },
      }
    );
    return result;
  };
}
