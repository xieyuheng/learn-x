#include<assert.h>
#include<stdbool.h>
#include<stdio.h>
#include<stdlib.h>
#include<X11/Xlib.h>
#include<X11/Xutil.h>
#include<X11/Xatom.h>

int
main() {
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

    while (true) {
        //
    }

    return 0;
}
