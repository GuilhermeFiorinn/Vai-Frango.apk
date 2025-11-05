import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

export type Exercise = {
  name: string;
  duration?: string;
  finished: boolean;
};

// Nome do arquivo que salvaremos no dispositivo
const FILENAME = "calendar.json";

function isExerciseArray(v: any): v is Exercise[] {
  return Array.isArray(v) && v.every((x) => x && typeof x.name === "string" && typeof x.finished === "boolean");
}

/**
 * Lê o 'calendar.json' do sistema de arquivos do dispositivo.
 */
export async function loadEvents(): Promise<Record<string, Exercise[]>> {
  try {
    const contents = await Filesystem.readFile({
      path: FILENAME,
      directory: Directory.Data, // Diretório seguro para dados do app
      encoding: Encoding.UTF8,
    });

    const parsed = JSON.parse(contents.data as string);
    
    // Validação dos dados lidos
    const out: Record<string, Exercise[]> = {};
    for (const k of Object.keys(parsed)) {
      const val = parsed[k];
      if (isExerciseArray(val)) {
        out[k] = val;
      }
    }
    return out;

  } catch (e) {
    // Se o arquivo não existe (primeira vez), retorna objeto vazio
    return {};
  }
}

/**
 * Salva o objeto de eventos no 'calendar.json' no dispositivo.
 */
export async function saveEvents(events: Record<string, Exercise[]>) {
  try {
    await Filesystem.writeFile({
      path: FILENAME,
      data: JSON.stringify(events, null, 2), // 'null, 2' formata o JSON
      directory: Directory.Data,
      encoding: Encoding.UTF8,
    });
  } catch (e) {
    console.error("Falha ao salvar eventos no dispositivo", e);
  }
}

/**
 * Adiciona um exercício a um dia (apenas em memória).
 * Retorna um NOVO objeto de eventos.
 */
export function addExercise(
  events: Record<string, Exercise[]>,
  dateKey: string,
  exercise: Exercise
): Record<string, Exercise[]> {
  return { ...events, [dateKey]: [...(events[dateKey] || []), exercise] };
}

/**
 * Remove um exercício de um dia (apenas em memória).
 * Retorna um NOVO objeto de eventos.
 */
export function removeExercise(
  events: Record<string, Exercise[]>,
  dateKey: string,
  index: number
): Record<string, Exercise[]> {
  const arr = [...(events[dateKey] || [])];
  arr.splice(index, 1);
  return { ...events, [dateKey]: arr };
}