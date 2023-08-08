require "pathname"

config_path = Pathname("~/.emacs").expand_path

puts File.open(config_path).read.lines.count
