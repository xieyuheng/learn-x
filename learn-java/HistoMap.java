import java.util.Scanner;
import java.util.ArrayList;
import java.io.File;
import java.io.IOException;
// import java.util.TreeMap;
import java.util.HashMap;

public class HistoMap {

    public static void main (String[] args) {
        Scanner data = null;
        HashMap <String, Integer> count;
        Integer idx;
        String word;
        Integer wordCount;

        try {
            data = new Scanner (new File ("alice30.txt"));
        }

        catch (IOException e) {
            System.out.println ("Sorry but I was unable to open your data file");
            e.printStackTrace ();
            System.exit (0);
        }

        count = new HashMap <String, Integer> ();

        while(data.hasNext ()) {
            word = data.next () .toLowerCase ();
            wordCount = count.get (word);
            if (wordCount == null) {
                wordCount = 0;
            }
            count.put (word, ++wordCount);
        }

        for (String i : count.keySet ()) {
            System.out.printf (
                "%-20s occured %5d times\n", i, count.get (i));
        }
    }
}
