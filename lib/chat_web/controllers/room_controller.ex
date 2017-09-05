defmodule ChatWeb.RoomController do
  use ChatWeb, :controller

  def show(conn, %{"id" => "lobby"}) do

    render conn, :show
  end
end