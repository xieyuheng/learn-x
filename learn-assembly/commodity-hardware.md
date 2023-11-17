# memory subsystem of computer

# CPU cache

# bus

- ISA :: Industry Standard Architecture
- PCI :: Peripheral Component Interconnect
- USB :: Universal Serial Bus
- SATA :: Serial ATA
- ATA :: Advanced Technology

# PIC & IRQ

PIC :: programmable interrupt controller

1. a device which collects hardware interrupt requests
   and signals the cpu that an interrupt has occured
2. actually we have two PICs
   The first one is for IRQ0-IRQ7
   and the second for IRQ8-IRQ15
   We must have a connection between PIC1 and PIC2
3. In Real Mode
   the hardware interrupts are mapped to
   interrupt 8-15 (first PIC) and 70-77 (second PIC)
   But that's a problem when we get into Protected Mode
   because interrupt 8-15 are reserved for exceptions
   for example
   That would mean that when we would get an exception
   the CPU would call a handler for the keyboard
   So we have to remap the PICs to use other interrupts
4. Remapping the PICs is quite easy
   It is done in the initialization of the PICs
   We must initialize the PICs before using them
   and this is done by sending some ICW (Initialization Commands Words)
   to the PICs controller

IRQ :: Interrupt Request

The IRQ lines are physical connections in the computer.

1. When a hardware device such as an adapter card
   activates the IRQ line
   it is detected by the PIC
2. The PIC then activates the interrupt pin on the processor
3. The processor responds by stopping whatever it is doing
   and then asks the PIC which interrupt should by executed
4. The PIC responds by telling the processor which interrupt to execute
   depending on which IRQ line was activated
5. the processor then gets the vector for that interrupt
   and looking in the interrupt vector table in memory
6. The processor then starts executing the procedure at the address
   that is pointed to by the vector
7. When the procedure is finished
   the processor resumes doing whatever it was doing before it was interrupted

Every IRQ line has a designated interrupt
and many IRQ lines have designated functions
Some of these functional designations are a little flexible
The following list shows the interrupt number and function of all the IRQ lines:

| line  | interrupt | function                                       |
|-------|-----------|------------------------------------------------|
| IRQ0  | 08        | system timer                                   |
| IRQ1  | 09        | keyboard                                       |
| IRQ2  | 0A        | PC/XT: EGA vertical retrace or maybe available |
|       |           | PC/AT: see explanation below                   |
| IRQ3  | 0B        | COM2 or maybe available                        |
| IRQ4  | 0C        | COM1                                           |
| IRQ5  | 0D        | PC/XT: hard disk drive                         |
|       |           | PC/AT: LPT2 or maybe available                 |
| IRQ6  | 0E        | floppy disk drive                              |
| IRQ7  | 0F        | LPT1                                           |
| IRQ8  | 70        | PC/AT: CMOS Real Time Clock                    |
| IRQ9  | 71        | PC/AT: see explanation below                   |
| IRQ10 | 72        | PC/AT: probably available                      |
| IRQ11 | 73        | PC/AT: probably available                      |
| IRQ12 | 74        | PC/AT: probably available                      |
|       |           | PS/2: mouse                                    |
| IRQ13 | 75        | PC/AT: numeric coprocessor                     |
| IRQ14 | 76        | PC/AT: hard disk drive                         |
| IRQ15 | 77        | PC/AT: probably available                      |

# IO APIC

# access pattern

when CPU accessing memory,
some patterns could show up.
it is good if one can configure the computer to fit these patterns.
