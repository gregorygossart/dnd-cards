'use client'

import { useEditor, EditorContent, type Editor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Placeholder from '@tiptap/extension-placeholder'
import Typography from '@tiptap/extension-typography'

import TaskList from '@tiptap/extension-task-list'
import TaskItem from '@tiptap/extension-task-item'
import Highlight from '@tiptap/extension-highlight'
import Underline from '@tiptap/extension-underline'
import { useEffect, useState, useCallback, useRef, useMemo } from 'react'
import { cn } from '@/lib/utils'
import {
    Heading2,
    Heading3,

    List,
    ListOrdered,
    Minus,
    Quote,
    Type,
} from 'lucide-react'

interface RichTextEditorProps {
    content: string
    onChange: (content: string) => void
    placeholder?: string
    className?: string
    readOnly?: boolean
    minHeight?: string
}

interface CommandItem {
    type: 'command'
    title: string
    icon: React.ElementType
    shortcut?: string
    command: (editor: Editor) => void
}

interface SectionHeader {
    type: 'section'
    title: string
}

type MenuItem = CommandItem | SectionHeader

const COMMANDS: MenuItem[] = [
    { type: 'section', title: 'Text' },
    {
        type: 'command',
        title: 'Text',
        icon: Type,
        command: (editor) => editor.chain().focus().setParagraph().run(),
    },
    {
        type: 'command',
        title: 'Section',
        icon: Heading2,
        shortcut: '##',
        command: (editor) => editor.chain().focus().toggleHeading({ level: 2 }).run(),
    },
    {
        type: 'command',
        title: 'Subsection',
        icon: Heading3,
        shortcut: '###',
        command: (editor) => editor.chain().focus().toggleHeading({ level: 3 }).run(),
    },

    { type: 'section', title: 'Lists' },
    {
        type: 'command',
        title: 'Bullet List',
        icon: List,
        shortcut: '-',
        command: (editor) => editor.chain().focus().toggleBulletList().run(),
    },
    {
        type: 'command',
        title: 'Numbered List',
        icon: ListOrdered,
        shortcut: '1.',
        command: (editor) => editor.chain().focus().toggleOrderedList().run(),
    },

    { type: 'section', title: 'Formatting' },
    {
        type: 'command',
        title: 'Flavor Text',
        icon: Quote,
        shortcut: '>',
        command: (editor) => editor.chain().focus().toggleBlockquote().run(),
    },

    {
        type: 'command',
        title: 'Divider',
        icon: Minus,
        shortcut: '---',
        command: (editor) => editor.chain().focus().setHorizontalRule().run(),
    },

]

export function RichTextEditor({ content, onChange, placeholder, className, readOnly = false }: RichTextEditorProps) {
    const [showCommands, setShowCommands] = useState(false)
    const [commandSearch, setCommandSearch] = useState('')
    const [selectedIndex, setSelectedIndex] = useState(0)

    // Refs for event handlers to avoid stale closures
    const showCommandsRef = useRef(showCommands)
    const commandSearchRef = useRef(commandSearch)
    const selectedIndexRef = useRef(selectedIndex)
    const filteredCommandsRef = useRef<MenuItem[]>([])

    // Ref for selectCommand to be used in handleKeyDown
    const selectCommandRef = useRef<((command: CommandItem) => void) | null>(null)

    const filteredCommands = useMemo(() => {
        if (commandSearch) {
            // When searching, only show matching commands (no section headers)
            const filtered = COMMANDS.filter((item): item is CommandItem =>
                item.type === 'command' && item.title.toLowerCase().includes(commandSearch.toLowerCase())
            )

            // Add fallback item if no matches
            if (filtered.length === 0) {
                return [{
                    type: 'command' as const,
                    title: `Type "/${commandSearch}" on the page`,
                    icon: Type,
                    shortcut: undefined,
                    command: () => {
                        setShowCommands(false)
                        setCommandSearch('')
                        setSelectedIndex(0)
                    },
                }]
            }

            return filtered
        }

        // When not searching, show all items including section headers
        return COMMANDS
    }, [commandSearch])

    // Sync refs
    useEffect(() => {
        showCommandsRef.current = showCommands
        commandSearchRef.current = commandSearch
        selectedIndexRef.current = selectedIndex
        filteredCommandsRef.current = filteredCommands
    }, [showCommands, commandSearch, selectedIndex, filteredCommands])

    const editor = useEditor({
        editable: !readOnly,
        immediatelyRender: false,
        extensions: [
            StarterKit.configure({
                heading: {
                    levels: [1, 2, 3],
                },
            }),
            Placeholder.configure({
                placeholder: ({ node }) => {
                    if (node.type.name === 'paragraph') {
                        return "Type '/' for commands"
                    }
                    return ''
                },
                showOnlyWhenEditable: true,
                showOnlyCurrent: true,
            }),
            Typography,
            TaskList,
            TaskItem.configure({
                nested: true,
                HTMLAttributes: {
                    class: 'flex items-start gap-2',
                },
            }),
            Highlight,
            Underline,
        ],
        content,
        editorProps: {
            attributes: {
                class: cn(
                    'rich-text-content dark max-w-none focus:outline-none min-h-[400px] px-6 py-4',
                    readOnly && 'cursor-default'
                ),
            },
            handleKeyDown: (view, event) => {
                if (readOnly) return false

                if (event.key === '/' && !showCommandsRef.current) {
                    // Small delay to let the / character be inserted first
                    setTimeout(() => {
                        setShowCommands(true)
                        setCommandSearch('')
                        setSelectedIndex(0)
                    }, 0)
                    return false
                }


                if (showCommandsRef.current) {
                    if (event.key === 'ArrowDown') {
                        event.preventDefault()
                        setSelectedIndex((prev) => {
                            const items = filteredCommandsRef.current
                            let next = (prev + 1) % items.length
                            // Skip section headers
                            while (items[next]?.type === 'section' && next !== prev) {
                                next = (next + 1) % items.length
                            }
                            return next
                        })
                        return true
                    }
                    if (event.key === 'ArrowUp') {
                        event.preventDefault()
                        setSelectedIndex((prev) => {
                            const items = filteredCommandsRef.current
                            let next = (prev - 1 + items.length) % items.length
                            // Skip section headers
                            while (items[next]?.type === 'section' && next !== prev) {
                                next = (next - 1 + items.length) % items.length
                            }
                            return next
                        })
                        return true
                    }
                    if (event.key === 'Enter') {
                        event.preventDefault()
                        const currentFiltered = filteredCommandsRef.current
                        const currentIndex = selectedIndexRef.current
                        const item = currentFiltered[currentIndex]
                        if (item && item.type === 'command' && selectCommandRef.current) {
                            selectCommandRef.current(item)
                        }
                        return true
                    }
                    if (event.key === 'Escape') {
                        setShowCommands(false)
                        setCommandSearch('')
                        return true
                    }
                    if (event.key === 'Backspace' && commandSearchRef.current === '') {
                        // If backspacing with no search text, close the menu
                        setShowCommands(false)
                        return false
                    }
                }
                return false
            },
        },
        onUpdate: ({ editor }) => {
            const text = editor.getText()

            // Update search query based on text after last /
            if (showCommandsRef.current) {
                const { from } = editor.state.selection
                const textBefore = editor.state.doc.textBetween(Math.max(0, from - 50), from, '\n')
                const lastSlashIndex = textBefore.lastIndexOf('/')

                if (lastSlashIndex !== -1) {
                    const searchText = textBefore.slice(lastSlashIndex + 1)
                    setCommandSearch(searchText)
                } else {
                    // No slash found, close menu
                    setShowCommands(false)
                    setCommandSearch('')
                }
            }

            onChange(editor.getHTML())
        },
    })

    // Update editable state when prop changes
    useEffect(() => {
        if (editor) {
            editor.setEditable(!readOnly)
        }
    }, [editor, readOnly])

    useEffect(() => {
        if (editor && content !== editor.getHTML()) {
            editor.commands.setContent(content)
        }
    }, [content, editor])

    const selectCommand = useCallback((command: CommandItem) => {
        if (editor) {
            // If it's the fallback command (no matches), just execute it (which closes menu)
            // We identify it by checking if it's not in the original commands list
            const isFallback = !COMMANDS.find(c => c.title === command.title)

            if (isFallback) {
                command.command(editor)
                return
            }

            const { from } = editor.state.selection
            const textBefore = editor.state.doc.textBetween(Math.max(0, from - 50), from, '\n')
            const lastSlashIndex = textBefore.lastIndexOf('/')

            if (lastSlashIndex !== -1) {
                // Calculate the actual position of the slash in the document
                const slashPos = from - (textBefore.length - lastSlashIndex)
                // Delete from slash to current cursor position
                editor.chain().focus().deleteRange({ from: slashPos, to: from }).run()
            }

            // Execute the command
            command.command(editor)

            // Reset state
            setShowCommands(false)
            setCommandSearch('')
            setSelectedIndex(0)
        }
    }, [editor])

    // Update ref for handleKeyDown
    useEffect(() => {
        selectCommandRef.current = selectCommand
    }, [selectCommand])

    // Calculate placeholder position
    const [placeholderPos, setPlaceholderPos] = useState<{ top: number; left: number } | null>(null)

    useEffect(() => {
        if (showCommands && commandSearch === '' && editor) {
            const { from } = editor.state.selection
            const coords = editor.view.coordsAtPos(from)
            const editorRect = editor.view.dom.getBoundingClientRect()

            setPlaceholderPos({
                top: coords.top - editorRect.top,
                left: coords.left - editorRect.left
            })
        } else {
            setPlaceholderPos(null)
        }
    }, [showCommands, commandSearch, editor])

    const containerRef = useRef<HTMLDivElement>(null)

    // Calculate menu position
    const [menuPos, setMenuPos] = useState<React.CSSProperties | null>(null)

    useEffect(() => {
        if (showCommands && editor && containerRef.current) {
            const { from } = editor.state.selection
            const coords = editor.view.coordsAtPos(from)
            const containerRect = containerRef.current.getBoundingClientRect()

            const spaceBelow = containerRect.bottom - coords.bottom
            const menuHeight = 320 // Approximate max height

            // Calculate top relative to the container
            // coords.bottom is viewport Y
            // containerRect.top is viewport Y
            // relativeTop = coords.bottom - containerRect.top

            if (spaceBelow < menuHeight) {
                // Position above
                setMenuPos({
                    bottom: containerRect.bottom - coords.top + 5,
                    left: 0,
                    right: 0,
                })
            } else {
                // Position below
                setMenuPos({
                    top: coords.bottom - containerRect.top + 5,
                    left: 0,
                    right: 0,
                })
            }
        } else {
            setMenuPos(null)
        }
    }, [showCommands, editor, commandSearch])

    if (!editor) {
        return null
    }

    return (
        <div ref={containerRef} className={cn(
            'relative flex flex-col rounded-lg bg-slate-800',
            !className?.includes('border-none') && 'border border-slate-700',
            className
        )}>
            {/* Editor Content */}
            <div className="flex-1 relative overflow-hidden">
                <EditorContent editor={editor} />
                {/* Filter Placeholder */}
                {placeholderPos && (
                    <div
                        className="absolute pointer-events-none text-slate-500"
                        style={{
                            top: placeholderPos.top,
                            left: placeholderPos.left,
                        }}
                    >
                        Filter...
                    </div>
                )}
            </div>

            {/* Slash Command Menu */}
            {showCommands && filteredCommands.length > 0 && menuPos && (
                <div
                    className="absolute z-50 rounded-lg border border-slate-700 bg-slate-800 shadow-xl overflow-hidden mx-4"
                    style={menuPos}
                >
                    <div className="max-h-80 overflow-y-auto custom-scrollbar p-1">
                        {filteredCommands.map((item, index) => {
                            // Section header
                            if (item.type === 'section') {
                                return (
                                    <div
                                        key={item.type + "/" + item.title}
                                        className="px-2 py-1.5 text-xs font-semibold text-slate-400 uppercase tracking-wider mt-2 first:mt-0"
                                    >
                                        {item.title}
                                    </div>
                                )
                            }

                            // Command item
                            const Icon = item.icon
                            const isSelected = index === selectedIndex
                            return (
                                <button
                                    key={item.type + "/" + item.title}
                                    ref={(el) => {
                                        if (isSelected && el) {
                                            el.scrollIntoView({ block: 'nearest', behavior: 'smooth' })
                                        }
                                    }}
                                    onClick={() => selectCommand(item)}
                                    className={cn(
                                        'flex w-full items-center gap-2 rounded px-2 py-1.5 text-sm transition-colors',
                                        isSelected
                                            ? 'bg-indigo-500 text-white'
                                            : 'text-slate-200 hover:bg-slate-700'
                                    )}
                                >
                                    <Icon className="h-4 w-4 flex-shrink-0" />
                                    <span className="font-medium flex-1 text-left">{item.title}</span>
                                    {item.shortcut && (
                                        <span className={cn(
                                            'text-xs font-mono px-1.5 py-0.5 rounded',
                                            isSelected
                                                ? 'bg-white/20 text-white'
                                                : 'bg-slate-900 text-slate-400'
                                        )}>
                                            {item.shortcut}
                                        </span>
                                    )}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}

        </div>
    )
}
