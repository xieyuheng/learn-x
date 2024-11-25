#include<assert.h>
#include<stdbool.h>
#include<stdio.h>
#include<stdlib.h>
#include<X11/Xlib.h>
#include<X11/Xutil.h>
#include<X11/Xatom.h>

int
learning() {
    int width = 800;
    int height = 600;

    Display* display = XOpenDisplay(0);
    if (!display) {
        printf("No display available\n");
        exit(1);
    }

    int root = DefaultRootWindow(display);
    int screen = DefaultScreen(display);

    Window window = XCreateSimpleWindow(
        display, root,
        0, 0,
        width, height, 0,
        BlackPixel(display, screen),
        BlackPixel(display, screen));

    if (!window) {
        printf("Window wasn't created properly\n");
        exit(1);
    }

    XStoreName(display, window, "Hello, World!");

    XMapWindow(display, window);
    XFlush(display);

    int windowOpen = 1;
    while(windowOpen)
    {
        XEvent ev;
        while(XPending(display) > 0)
        {
            XNextEvent(display, &ev);
            switch(ev.type)
            {
            case DestroyNotify: {
                XDestroyWindowEvent* e = (XDestroyWindowEvent*) &ev;
                if(e->window == window)
                {
                    windowOpen = 0;
                }
            } break;
            }
        }
    };

    return 0;
}
