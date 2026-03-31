'use client';

import { useEffect, useReducer, useRef } from 'react';
import { useForm } from 'react-hook-form';

type Task = {
    id: string;
    title: string;
    completed: boolean;
};

type Filter = 'all' | 'active' | 'completed';

type TaskState = {
    tasks: Task[];
    filter: Filter;
};

type TaskAction =
    | { type: 'add'; payload: { title: string } }
    | { type: 'toggle'; payload: { id: string } }
    | { type: 'remove'; payload: { id: string } }
    | { type: 'setFilter'; payload: { filter: Filter } };

type TaskFormValues = {
    title: string;
};

const initialState: TaskState = {
    tasks: [],
    filter: 'all',
};

function taskReducer(state: TaskState, action: TaskAction): TaskState {
    switch (action.type) {
        case 'add':
            return {
                ...state,
                tasks: [
                    {
                        id: crypto.randomUUID(),
                        title: action.payload.title,
                        completed: false,
                    },
                    ...state.tasks,
                ],
            };
        case 'toggle':
            return {
                ...state,
                tasks: state.tasks.map((task) =>
                    task.id === action.payload.id
                        ? { ...task, completed: !task.completed }
                        : task
                ),
            };
        case 'remove':
            return {
                ...state,
                tasks: state.tasks.filter((task) => task.id !== action.payload.id),
            };
        case 'setFilter':
            return {
                ...state,
                filter: action.payload.filter,
            };
        default:
            return state;
    }
}

export default function LearnPage() {
    const [state, dispatch] = useReducer(taskReducer, initialState);
    const titleInputRef = useRef<HTMLInputElement | null>(null);

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<TaskFormValues>({
        defaultValues: {
            title: '',
        },
    });

    const visibleTasks = state.tasks.filter((task) => {
        if (state.filter === 'active') {
            return !task.completed;
        }

        if (state.filter === 'completed') {
            return task.completed;
        }

        return true;
    });

    const completedCount = state.tasks.filter((task) => task.completed).length;
    const activeCount = state.tasks.length - completedCount;

    useEffect(() => {
        titleInputRef.current?.focus();
    }, []);

    const onSubmit = async ({ title }: TaskFormValues) => {
        dispatch({
            type: 'add',
            payload: {
                title: title.trim(),
            },
        });
        reset();
        titleInputRef.current?.focus();
    };

    const { ref: titleFieldRef, ...titleField } = register('title', {
        required: 'タスク名を入力してください。',
        validate: (value) =>
            value.trim().length > 0 || '空白だけのタスクは追加できません。',
    });

    return (
        <main className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-6 py-8 text-black">
            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h1 className="text-center font-bold">フック学習ページ</h1>
                <p className="mt-4 text-sm leading-7 text-slate-600">
                    この画面では
                    <span className="font-semibold text-slate-900"> useReducer </span>
                    でタスク状態をまとめて管理し、
                    <span className="font-semibold text-slate-900"> useForm </span>
                    で入力チェックを行い、
                    <span className="font-semibold text-slate-900"> useRef </span>
                    で入力欄にフォーカスを戻します。
                </p>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <h2 className="font-semibold text-slate-900">タスク追加</h2>
                <form className="mt-4 flex flex-col gap-3" onSubmit={handleSubmit(onSubmit)}>
                    <label className="text-sm font-medium text-slate-700" htmlFor="task-title">
                        タスク名
                    </label>
                    <div className="flex flex-col gap-3 sm:flex-row">
                        <input
                            id="task-title"
                            className="min-h-11 flex-1 rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-500"
                            placeholder="例: useRefで入力欄にフォーカスを当てる"
                            {...titleField}
                            ref={(element) => {
                                titleFieldRef(element);
                                titleInputRef.current = element;
                            }}
                        />
                        
                        <button
                            className="min-h-11 rounded-xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:bg-blue-300"
                            type="submit"
                            disabled={isSubmitting}
                        >
                            追加
                        </button>
                    </div>
                    {errors.title && (
                        <p className="text-sm text-red-600">{errors.title.message}</p>
                    )}
                </form>
            </section>

            <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="font-semibold text-slate-900">タスク一覧</h2>
                        <p className="mt-2 text-sm text-slate-600">
                            全{state.tasks.length}件 / 未完了{activeCount}件 / 完了{completedCount}件
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                        {(['all', 'active', 'completed'] as const).map((filter) => (
                            <button
                                key={filter}
                                type="button"
                                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                                    state.filter === filter
                                        ? 'bg-slate-900 text-white'
                                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                                }`}
                                onClick={() =>
                                    dispatch({
                                        type: 'setFilter',
                                        payload: { filter },
                                    })
                                }
                            >
                                {filter === 'all' && 'すべて'}
                                {filter === 'active' && '未完了'}
                                {filter === 'completed' && '完了'}
                            </button>
                        ))}
                    </div>
                </div>

                <ul className="mt-6 flex flex-col gap-3">
                    {visibleTasks.length === 0 && (
                        <li className="rounded-xl border border-dashed border-slate-300 px-4 py-5 text-center text-sm text-slate-500">
                            条件に合うタスクはありません。
                        </li>
                    )}

                    {visibleTasks.map((task) => (
                        <li
                            key={task.id}
                            className="flex flex-col gap-3 rounded-xl border border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <input
                                    aria-label={`${task.title}を完了にする`}
                                    checked={task.completed}
                                    className="h-5 w-5"
                                    type="checkbox"
                                    onChange={() =>
                                        dispatch({
                                            type: 'toggle',
                                            payload: { id: task.id },
                                        })
                                    }
                                />
                                <span
                                    className={
                                        task.completed
                                            ? 'text-slate-400 line-through'
                                            : 'text-slate-800'
                                    }
                                >
                                    {task.title}
                                </span>
                            </div>

                            <button
                                type="button"
                                className="rounded-lg bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-red-100 hover:text-red-700"
                                onClick={() =>
                                    dispatch({
                                        type: 'remove',
                                        payload: { id: task.id },
                                    })
                                }
                            >
                                削除
                            </button>
                        </li>
                    ))}
                </ul>
            </section>
        </main>
    );
}
